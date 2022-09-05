export const schema = {
    "models": {
        "SessionGroup": {
            "name": "SessionGroup",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "move": {
                    "name": "move",
                    "isArray": false,
                    "type": {
                        "model": "Move"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "sessionGroupMoveId"
                    }
                },
                "sessions": {
                    "name": "sessions",
                    "isArray": true,
                    "type": {
                        "model": "Session"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "sessionGroupSessionsId"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "sessionGroupMoveId": {
                    "name": "sessionGroupMoveId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "SessionGroups",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Move": {
            "name": "Move",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Moves",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Session": {
            "name": "Session",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "quaternionTimestamp": {
                    "name": "quaternionTimestamp",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "quaternionW": {
                    "name": "quaternionW",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "quaternionX": {
                    "name": "quaternionX",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "quaternionY": {
                    "name": "quaternionY",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "quaternionZ": {
                    "name": "quaternionZ",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "linearAccerationTimestamp": {
                    "name": "linearAccerationTimestamp",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "linearAccerationX": {
                    "name": "linearAccerationX",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "linearAccerationY": {
                    "name": "linearAccerationY",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "linearAccerationZ": {
                    "name": "linearAccerationZ",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "tags": {
                    "name": "tags",
                    "isArray": true,
                    "type": {
                        "model": "SessionTags"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "session"
                    }
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "sessionGroupSessionsId": {
                    "name": "sessionGroupSessionsId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Sessions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Tag": {
            "name": "Tag",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "value": {
                    "name": "value",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sessions": {
                    "name": "sessions",
                    "isArray": true,
                    "type": {
                        "model": "SessionTags"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "tag"
                    }
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Tags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "SessionTags": {
            "name": "SessionTags",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "session": {
                    "name": "session",
                    "isArray": false,
                    "type": {
                        "model": "Session"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "sessionID"
                    }
                },
                "tag": {
                    "name": "tag",
                    "isArray": false,
                    "type": {
                        "model": "Tag"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "tagID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "SessionTags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySession",
                        "fields": [
                            "sessionID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byTag",
                        "fields": [
                            "tagID"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "628fe038aa2c066b7cd17795c02fa329"
};