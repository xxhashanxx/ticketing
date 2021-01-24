//normal way
/* export const natsWrapper = {
  client: {
      publish: 
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
     
  },
}; */

// use this to test around this mock

export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};

