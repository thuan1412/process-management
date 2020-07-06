setInterval(() => {
  let s = 0;
  for (i = 0; i < 10000; i++) {
    s += i;
  }
  console.log(`Process2 log at ${Date.now()}`);
}, 200000);
