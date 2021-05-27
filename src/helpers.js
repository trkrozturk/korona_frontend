export const getCitySet = (dataSet) => {
  const dropDownData = [];
  let dropDownObj = {};
  const dropDownDataObj = [];
  for (let i = 0; i < dataSet.length; i++) {
    if (dropDownData.indexOf(dataSet[i].sehir) === -1) {
      dropDownData.push(dataSet[i].sehir);
    }
  }
  for (var j = 0; j < dropDownData.length; j++) {
    dropDownObj = {
      text: dropDownData[j],
      value: dropDownData[j],
      key: dropDownData[j],
    };
    dropDownDataObj.push(dropDownObj);
  }
  return dropDownDataObj;
};

export const stringToDate = (dateString) => {
  const dateParts = dateString.split(".");
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return dateObject;
};

export const sortData = (data) => {
  const sortedData = data.sort(
    (a, b) => stringToDate(a.tarih) - stringToDate(b.tarih)
  );
  return sortedData;
};
