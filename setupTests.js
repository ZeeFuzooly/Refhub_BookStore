Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // For older versions of Jest
      removeListener: jest.fn(), // For older versions of Jest
      addEventListener: jest.fn(), // For modern versions
      removeEventListener: jest.fn(), // For modern versions
      dispatchEvent: jest.fn(), // For modern versions
    })),
  });
  