const API_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const cachedNodes = {};

const getNodes = async (nodeId) => {
  console.log(cachedNodes);
  if (cachedNodes[nodeId ? nodeId : 'root']) {
    return cachedNodes[nodeId ? nodeId : 'root'];
  } else {
    const REQEUST_URL = nodeId ? API_URL + '/' + nodeId : API_URL;
    try {
      const response = await fetch(REQEUST_URL);

      if (!response.ok) {
        throw new Error('서버로 요청 중 문제가 발생했습니다.');
      }

      cachedNodes[nodeId ? nodeId : 'root'] = response.json();

      return cachedNodes[nodeId ? nodeId : 'root'];
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default getNodes;
