// riyu APIを叩く関数

async function fetchLectureDetail(lectureNumber) {
  try {
    const response = await fetch(`https://kurisyushien.org/api?mode=exchange&word=${lectureNumber} `, {
      mode: 'cors',
      redirect: 'follow'
    });
    if (!response.ok) {
      throw new Error('ネットワーク応答に問題があります: ' + response.statusText);
    }
    const data = await response.json();
    return data.data[0];
  } catch (e) {
    console.error('Fetchエラー:', error);
    throw error;
  }
}
async function fetchNormalMode() {
  try {
    // fetchでデータを取得
    const response = await fetch(`https://kurisyushien.org/api?mode=hackathon`, {
      mode: 'cors',
      redirect: 'follow'
    });
    // レスポンスが正常か確認
    if (!response.ok) {
      throw new Error('ネットワーク応答に問題があります: ' + response.statusText);
    }
    // JSONとしてレスポンスを解析
    const data = await response.json();
    // 取得したデータを返す
    return data.data;
  } catch (error) {
    // エラーハンドリング
    console.error('Fetchエラー:', error);
    throw error;
  }
}
async function fetchAll() {
  try {
    // fetchでデータを取得
    const response = await fetch(`https://kurisyushien.org/api?mode=&word=`, {
      mode: 'cors',
      redirect: 'follow'
    });
    // レスポンスが正常か確認
    if (!response.ok) {
      throw new Error('ネットワーク応答に問題があります: ' + response.statusText);
    }
    // JSONとしてレスポンスを解析
    const data = await response.json();
    // 取得したデータを返す
    return data;
  } catch (error) {
    // エラーハンドリング
    console.error('Fetchエラー:', error);
    throw error;
  }
}
