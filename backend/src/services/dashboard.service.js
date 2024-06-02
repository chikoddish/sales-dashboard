const fs = require('fs');

const getData = (async (reqBody) => {
  return new Promise((resolve, reject) => {
  try {
      const fileLocation = './public/json/sales.json';
    
      const readableStream = fs.createReadStream(fileLocation, { encoding: 'utf8' });
      
      let jsonData = '';
      readableStream.on('data', (chunk) => { jsonData += chunk });
      readableStream.on('end', async () => {
        const parsedData = JSON.parse(jsonData);
        const uniqueStates = [...new Set(parsedData.map(item => item.State))].sort();
        const uniqueOrderDate = [...new Set(parsedData.map(item => item['Order Date']))].sort();
        const dataToSend = {
          state : uniqueStates[0],
          parsedData
        }
        if(reqBody && reqBody.state) {
          dataToSend.state = reqBody.state;
        }
        const data = await getStateData(dataToSend);
        readableStream.close();
        resolve({...data, states : uniqueStates, uniqueOrderDate});
      });
      
      readableStream.on('error', (err) => {
        throw new Error(err);
      });
    } catch (err) {
      reject({message : err.message});
    } 
  })
});

const getStateData = (paramData) => {
  return new Promise((resolve, reject) => {
    try {
      let fromDate = null;
      let toDate = null;
      let filteredData = [];
      paramData.parsedData.filter(data => {
        if(data.State === paramData.state) {
          if (fromDate) {
            if (new Date(fromDate) > new Date(data["Order Date"])) {
              fromDate = data["Order Date"];
            }
          } else {
            fromDate = data["Order Date"];
          }
      
          if (toDate) {
            if (new Date(toDate) < new Date(data["Order Date"])) {
              toDate = data["Order Date"];
            }
          } else {
            toDate = data["Order Date"];
          }
          filteredData.push(data);
        }
      });
      resolve({fromDate, toDate, filteredData});
    } catch(err) {
      reject({message : err.message});
    }
    })
}

module.exports = {
  getData
};