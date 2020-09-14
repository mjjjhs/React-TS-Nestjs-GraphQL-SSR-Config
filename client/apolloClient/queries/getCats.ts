import gql from 'graphql-tag';

export const GET_CATS = gql`
    query getCats {
        getCats {
            name
        }
    }
`;

export interface IGetCatsVariables {}

export interface IGetCatsData {
    getCats: {
        name: string;
    };
}