d3.csv('data/rainfall-by-state.csv').then((data) => {
  data.forEach((stateData) => {
    stateData.rainfall = +stateData.rainfall;
    const checkChar = /^[A-Z]/;
    for (let i = 0; i < 5; i++) {
      if (checkChar.test(stateData.state)) {
        break;
      } else {
        stateData.state = stateData.state.substring(1);
      }
    }
  });

  let dataset1 = [];
  let dataset2 = [];
  let dataset3 = [];
  let dataset4 = [];
  let dataset5 = [];


  data.forEach((element, index) => {
    if (index < 10) {
      dataset1.push(element);
    } else if (index < 20) {
      dataset2.push(element);
    } else if (index < 30) {
      dataset3.push(element);
    } else if (index < 40) {
      dataset4.push(element);
    } else {
      dataset5.push(element);
    }
  });

  const datasets = [
    dataset1,
    dataset2,
    dataset3,
    dataset4,
    dataset5];

  console.log(datasets);
});
