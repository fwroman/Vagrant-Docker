import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { DbWithLoopback4DataSource } from "../datasources";
import { User } from "../models/user.model";

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {

    constructor(@inject('datasources.data_fred') datasource: DbWithLoopback4DataSource) {
        super(User, datasource);
    }
}