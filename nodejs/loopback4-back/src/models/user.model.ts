import { Entity, model, property } from "@loopback/repository";
import moment from 'moment';

@model({
    settings: {
        //strictObjectIDCoercion: true
    }
})
export class User extends Entity {
    @property({
        type: 'string',
        id: true,
        generated: true,
        mongodb: { dataType: 'ObjectID' }
    })
    id: string;

    @property({
        type: 'string',
        required: true
    })
    username: string;

    @property({
        type: 'number'
    })
    gitId: number;

    @property({
        type: 'string',
        required: true
    })
    nodeId: string;


    @property({
        type: 'string',
        required: true
    })
    avatarUrl: string;

    @property({
        type: 'string'
    })
    gravatarId: string;

    @property({
        type: 'string',
        required: true
    })
    url: string;

    @property({
        type: 'string',
        required: true
    })
    htmlUrl: string;

    @property({
        type: 'string',
        required: true
    })
    followersUrl: string;

    @property({
        type: 'string',
        required: true
    })
    followingUrl: string;

    @property({
        type: 'string',
        required: true
    })
    gistsUrl: string;

    @property({
        type: 'string',
        required: true
    })
    starredUrl: string;

    @property({
        type: 'string',
        required: true
    })
    subscriptionsUrl: string;

    @property({
        type: 'string',
        required: true
    })
    organizationsUrl: string;

    @property({
        type: 'string',
        required: true
    })
    reposUrl: string;

    @property({
        type: 'string',
        required: true
    })
    eventsUrl: string;

    @property({
        type: 'string'
    })
    receivedEventsUrl: string;

    @property({
        type: 'string',
        required: true
    })
    type: string;

    @property({
        type: 'boolean',
        required: true
    })
    siteAdmin: boolean;

    @property({
        type: 'string'
    })
    createdAt: string;

    @property({
        type: 'string'
    })
    updatedAt: string;

    constructor(data?: Partial<User>) {
        super(data);
    }
}

User.definition.properties.createdAt.default = moment().format("YYYY-MM-DD HH:mm:ss");