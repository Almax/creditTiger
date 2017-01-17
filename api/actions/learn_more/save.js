

export default function save(req) {
  console.log('learnMore/save');
  return new Promise((resolve, reject) => {
    console.log('learnMore/save resolved');
    resolve({herro: 'object'});
  });
}
