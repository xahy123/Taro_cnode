import Request from '../../utils/request';

export const getDetail = (data) => {
  return Request({
    url: `/topic/${data.id}`,
    method: 'GET',
  });
};
