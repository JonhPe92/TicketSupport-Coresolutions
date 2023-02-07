/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation login($identifier: String!, $password: String!) {
        login(input: { identifier: $identifier, password: $password }) {
            jwt
            user {
                id
                username
                email
            }
        }
    }
`;

export const USER_DATA = gql`
    query userData($id: ID!) {
        usersPermissionsUser(id: $id) {
            data {
                attributes {
                    name
                    lastname
                    role {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;
