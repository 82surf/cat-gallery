const getRootNodes = async () => {
  try {
    const response = await fetch(
      'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev',
    );

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

export { getRootNodes };
