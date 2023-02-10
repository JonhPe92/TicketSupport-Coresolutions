/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

// QUERIES
export const GET_CONTRACTS = gql`
    query contracts {
        contracts {
            data {
                attributes {
                    name
                    company {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                    service_type
                    start_date
                    end_date
                    remaining_hours
                    state
                }
            }
        }
    }
`;
