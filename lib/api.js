const API_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const getNodes = async (nodeId) => {
  try {
    const requestUrl = nodeId ? API_URL + '/' + nodeId : API_URL;
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error('데이터를 가져오는 중 문제가 발생했습니다.');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default getNodes;
