import expect from 'unexpected';
import processChildren from '../source/javascript/children-render/process-children';

describe('Process Children', () => {
  it('should be function', () => {
    expect(processChildren, 'to be a', 'function');
  });

  it('should error when sumbiting wrong type', () => {
    expect(processChildren, 'to throw', 'No data defined.');
  });

  it('should return empty array', () => {
    expect(processChildren([]), 'to be a', 'array');
  });
  
  it('should process basic blocks', () => {
    const data = [{
      type: 'block.navigation'
    }];

    expect(processChildren(data), 'to be a', 'array');
    expect(processChildren(data), 'to be non-empty');
    expect(processChildren(data), 'to have length', 1);
    expect(processChildren(data), 'to contain', {
      type: 'navigation'
    });
  });

  it('should process slider input', () => {
    const data = [{
      type: 'block.sliderinput',
      min: 0,
      max: 100,
      step: 1,
      label: "Slider",
      onChange: function () {}
    }];

    expect(processChildren(data), 'to be a', 'array');
    expect(processChildren(data), 'to be non-empty');
    expect(processChildren(data), 'to have length', 1);
    expect(processChildren(data), 'to contain', {
      type: 'sliderinput',
      min: data[0].min,
      max: data[0].max,
      step: data[0].step,
      label: data[0].label,
      onChange: data[0].onChange
    });
  });

  it('should process check box', () => {
    const data = [{
      type: 'block.checkbox',
      state: 'on',
      label: "Slider",
      onClick: function () {}
    }];

    expect(processChildren(data), 'to be a', 'array');
    expect(processChildren(data), 'to be non-empty');
    expect(processChildren(data), 'to have length', 1);
  });

  it('should process open action', () => {
    const data = [{
      type: 'open.sidetab',
      title: 'Sidetab title',
      target: 'some-sidetab'
    }];

    expect(processChildren(data), 'to be a', 'array');
    expect(processChildren(data), 'to be non-empty');
    expect(processChildren(data), 'to have length', 1);
    expect(processChildren(data), 'to contain', {
      type: 'sidetabopener',
      title: data[0].title,
      target: data[0].target
    });
  });
});
