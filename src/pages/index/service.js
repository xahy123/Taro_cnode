import Request from '../../utils/request';

// export const demo = (data) => {
//   return Request({
//     url: '路径',
//     method: 'POST',
//     data,
//   });
// };

export const getList = body => 
  Request({
    url: `/topics?page=${body.page}&limit=${body.limit}&tab=${body.tab}`,
    method: 'GET'
  })

