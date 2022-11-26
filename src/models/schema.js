export const schema = {
    "models": {
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
                "name": {
                    "name": "name",
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
        }
    },
    "enums": {},
    "nonModels": {},
    "codegenVersion": "3.3.2",
    "version": "9f229c0896ab2f64e01089749034dff6"
};