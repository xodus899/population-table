const getData = () => {
  const endPoint = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
  fetch(endPoint)
  .then(getResponse)
  .then(addSource)
  .catch(errorCatch);
};

const getResponse = async (response) => {
  if(!response.ok) {
    throw new Error(`Not a valid network response, ${response.status}`);
  }
  return await response.json();
};

const addSource = (value) => {
  const table = document.querySelector(".census");
  value.source.forEach((source) => {
    const h1Title = document.createElement("h1");
    return table.insertAdjacentHTML("afterbegin",
    h1Title.innerHTML = `<h1 class="title"> Source: ${source.annotations.source_name}</h1>`);
  });
  insertTable(value);
};

const insertTable = (payload) => {
  const table = document.querySelector(".census tbody");
  // const sortByYear = payload.data.sort((a, b) => {return a.Year - b.Year});

  payload.data.reverse().forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("table-row-data");

    row.append(addCell(item.Nation));
    row.append(addCell(item.Year));
    row.append(addCell(item.Population));
    table.append(row);
  });
};

const addCell = (value) => {
  const tableData = document.createElement("td");
  const textNode = document.createTextNode(value);
  tableData.appendChild(textNode);
  return tableData;
};

const errorCatch = (error) => {
  throw new Error(`Error:,${error}`);
}

getData();
