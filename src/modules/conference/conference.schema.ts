import gql from 'graphql-tag';

const Conference = gql`
  enum ConferenceType {
    venue
    online
  }

  enum ConferenceDateType {
    single
    multiple
  }

  type Conference {
    _id: String!
    image: String
    description: String
    summary: String
    title: String
    organizer: String
    address: String
    type: ConferenceType!
    dateType: ConferenceDateType!
    startDate: Date
    endDate: Date
    startTime: String
    endTime: String
    author: String
    status: String
    onboardedSteps: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateConferenceInput {
    title: String
    organizer: String
    address: String
    type: ConferenceType!
    dateType: ConferenceDateType!
    startDate: Date
    endDate: Date
    startTime: String
    endTime: String
  }

  input GetConferencesInput {
    filters: JSON
  }

  input GetConferenceInput {
    filters: JSON
  }

  extend type Query {
    getConferences(data: GetConferencesInput!): [Conference!]!
    getConference(data: GetConferenceInput!): Conference!
  }

  extend type Mutation {
    createConference(data: CreateConferenceInput!): Conference!
  }
`;

export default Conference;
