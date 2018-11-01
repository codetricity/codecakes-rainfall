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
  console.log(data);
});
