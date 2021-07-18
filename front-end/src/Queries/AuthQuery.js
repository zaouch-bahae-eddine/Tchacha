import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation LoginMutation($loginEmail: String!, $loginPassword: String!) {
        login(email: $loginEmail, password: $loginPassword) {
            ...on Error{
                __typename
                msg
                status
            }
            ...on Token{
                __typename
                jwt
                msg
                status
            }
        }
    }
`;
export const REGISTER = gql`
    mutation RegisterMutation($registerUser: UserInput!) {
        register(user: $registerUser) {
            ...on Error{
                msg
                status
                __typename
            }
            ...on Token{
                jwt
                msg
                status
                __typename
            }
        }
    }
`;