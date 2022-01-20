import { useMutation } from '@apollo/react-hooks';
import getHeaders from '@common/utilities/get-headers';

export default (mutation: any, variables: any) => {
  const options = {
    ...variables,
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: getHeaders(),
    },
  };

  return useMutation(mutation, options);
};
