import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where, } from '@loopback/repository';
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response, RestBindings, Response, } from '@loopback/rest';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import moment from 'moment';
import { inject } from '@loopback/core';

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) { }

  /**
   * METHOD TO PERFORM THE POST HTTP OPERATION TO CREATE USERS
   * @param user 
   * @returns 
   */
  @post('/users')
  @response(201, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User | unknown> {
    const searchedUser = await this.userRepository.findOne({ where: { username: user.username } });
    if (!searchedUser) {
      return this.userRepository.create(user);
    }
    this.response.status(400).json({
      message: "El usuario ya ha sido agregado anteriormente",
      name: "USER_ALREADY_EXISTS"
    });
  }

  /**
   * METHOD TO PERFORM THE GET HTTP OPERATION TO COUNT USERS RECORDS
   * @param where 
   * @returns 
   */
  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  /**
   * METHOD TO PERFORM THE GET HTTP OPERATION TO GET ALL USERS
   * @param filter 
   * @returns 
   */
  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  /**
   * METHOD TO PERFORM THE PATCH HTTP OPERATION TO UPDATE ALL THE USERS DATA
   * @param user 
   * @param where 
   * @returns 
   */
  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  /**
   * METHOD TO PERFORM THE GET HTTP OPERATION TO RETRIEVE USER DATA BY ID
   * @param id 
   * @param filter 
   * @returns 
   */
  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, { exclude: 'where' }) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  /**
   * METHOD TO PERFORM THE PATCH HTTP OPERATION TO PARTIALLY UPDATE USER DATA BY ID
   * @param id 
   * @param user 
   */
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
  ): Promise<void> {
    user.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    await this.userRepository.updateById(id, user);
  }

  /**
   * METHOD TO PERFORM THE PUT HTTP OPERATION TO UPDATE COMPLETE USER DATA BY ID
   * @param id 
   * @param user 
   */
  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success'
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    user.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    await this.userRepository.replaceById(id, user);
  }

  /**
   * METHOD TO PERFORM THE DELETE HTTP OPERATION TO REMOVE A USER FROM THE DATABASE
   * @param id 
   */
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
