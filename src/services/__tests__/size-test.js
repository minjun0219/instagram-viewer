import {fitSize} from '../size';

describe('Browser Size: 300x300', () => {

  it('Square Image: 640x640', () => {
    expect(fitSize(300, 300, 640, 640)).toEqual({
      width: 300,
      height: 300,
      left: 0,
      top: 0
    });
  });

  it('Landscape Image: 640x479', () => {
    expect(fitSize(300, 300, 640, 479)).toEqual({
      width: 300,
      height: 225,
      left: 0,
      top: 37.5
    });
  });

  it('Portrait Image: 479x640', () => {
    expect(fitSize(300, 300, 479, 640)).toEqual({
      width: 225,
      height: 300,
      left: 37.5,
      top: 0
    });
  });

});

describe('Browser Size: 500x500', () => {

  it('Square Image: 640x640', () => {
    expect(fitSize(500, 500, 640, 640)).toEqual({
      width: 500,
      height: 500,
      left: 0,
      top: 0
    });
  });

  it('Landscape Image: 640x479', () => {
    expect(fitSize(500, 500, 640, 479)).toEqual({
      width: 500,
      height: 375,
      left: 0,
      top: 62.5
    });
  });

  it('Portrait Image: 479x640', () => {
    expect(fitSize(500, 500, 479, 640)).toEqual({
      width: 375,
      height: 500,
      left: 62.5,
      top: 0
    });
  });

});

describe('Browser Size: 700x700', () => {

  it('Square Image: 640x640', () => {
    expect(fitSize(700, 700, 640, 640)).toEqual({
      width: 640,
      height: 640,
      left: 30,
      top: 30
    });
  });

  it('Landscape Image: 640x479', () => {
    expect(fitSize(700, 700, 640, 479)).toEqual({
      width: 640,
      height: 479,
      left: 30,
      top: 110.5
    });
  });

  it('Portrait Image: 479x640', () => {
    expect(fitSize(700, 700, 479, 640)).toEqual({
      width: 479,
      height: 640,
      left: 110.5,
      top: 30
    });
  });

});

describe('iPhone 6 (Portrait): 375x667', () => {

  it('Square Image: 640x640', () => {
    expect(fitSize(375, 667, 640, 640)).toEqual({
      width: 375,
      height: 375,
      left: 0,
      top: 146
    });
  });

  it('Landscape Image: 640x479', () => {
    expect(fitSize(375, 667, 640, 479)).toEqual({
      width: 375,
      height: 281,
      left: 0,
      top: 193
    });
  });

  it('Portrait Image: 479x640', () => {
    expect(fitSize(375, 667, 479, 640)).toEqual({
      width: 375,
      height: 502,
      left: 0,
      top: 82.5
    });
  });

});

describe('iPhone 6 (Landscape): 667x375', () => {

  it('Square Image: 640x640', () => {
    expect(fitSize(667, 375, 640, 640)).toEqual({
      width: 375,
      height: 375,
      left: 146,
      top: 0
    });
  });

  it('Landscape Image: 640x479', () => {
    expect(fitSize(667, 375, 640, 479)).toEqual({
      width: 502,
      height: 375,
      left: 82.5,
      top: 0
    });
  });

  it('Portrait Image: 479x640', () => {
    expect(fitSize(667, 375, 479, 640)).toEqual({
      width: 281,
      height: 375,
      left: 193,
      top: 0
    });
  });

});

describe('PC Browser (Landscape): 1024x768', () => {

  it('Square Image: 640x640', () => {
    expect(fitSize(1024, 768, 640, 640)).toEqual({
      width: 640,
      height: 640,
      left: 192,
      top: 64
    });
  });

  it('Landscape Image: 640x479', () => {
    expect(fitSize(1024, 768, 640, 479)).toEqual({
      width: 640,
      height: 479,
      left: 192,
      top: 144.5
    });
  });

  it('Portrait Image: 479x640', () => {
    expect(fitSize(1024, 768, 479, 640)).toEqual({
      width: 479,
      height: 640,
      left: 272.5,
      top: 64
    });
  });

});
