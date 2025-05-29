import { gapi } from 'gapi-script';

const getPeople = async () => {
  try {
    const peopleResponse = await gapi.client.people.people.listDirectoryPeople({
      readMask: 'names,emailAddresses',
      sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
      pageSize: 300,
    });

    const people = peopleResponse.result.people || [];

    const simplifiedPeople = people.map((person) => {
      const name = person.names?.[0]?.displayName || '';
      const email = person.emailAddresses?.[0]?.value || '';
      return { name, email };
    });

    return simplifiedPeople;
  } catch (error) {
    console.error('Error fetching people:', error);
  }
};

export default getPeople;
