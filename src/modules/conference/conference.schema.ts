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

  type ConferenceImage {
    id: String
    url: String
  }

  type ConferenceFile {
    id: String
    url: String
    friendlyName: String
  }

  type ConferenceTicket {
    _id: String!
    title: String
    quantity: Int
    type: String
    minQuantity: Int
    maxQuantity: Int
    price: Int
    participants: [String]
  }

  type Conference {
    _id: String!
    image: ConferenceImage
    tickets: [ConferenceTicket]
    description: String
    summary: String
    files: [ConferenceFile]
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

  input UpdateConferenceImageInput {
    id: String
    url: String
  }

  input UpdateConferenceFilesInput {
    id: String
    url: String
    friendlyName: String
  }

  input UpdateConferenceTicketsInput {
    _id: String!
    title: String
    quantity: Int
    type: String
    minQuantity: Int
    maxQuantity: Int
    price: Int
  }

  input UpdateConferenceInput {
    conferenceId: String!
    image: UpdateConferenceImageInput
    tickets: [UpdateConferenceTicketsInput]
    description: String
    summary: String
    files: [UpdateConferenceFilesInput]
    title: String
    organizer: String
    address: String
    type: ConferenceType
    dateType: ConferenceDateType
    startDate: Date
    endDate: Date
    startTime: String
    endTime: String
    status: String
    onboardedSteps: [String]
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
    updateConference(data: UpdateConferenceInput!): Conference!
  }
`;

export default Conference;
