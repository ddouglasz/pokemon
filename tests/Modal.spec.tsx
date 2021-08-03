import React from 'react';
import { Modal } from '../components/Modal';
import { render } from '@testing-library/react';
import jest from 'jest-mock';

const props = {
  open: true,
  title: '',
  onClose: jest.fn(),
};

describe('Modal', () => {
  test('should render opened modal', () => {
    const { getAllByTestId } = render(<Modal {...props} />);

    expect(getAllByTestId('modal-container').length).toEqual(1);
  });

  test('should render close modal button', () => {
    const { getAllByTestId } = render(<Modal {...props} />);

    expect(getAllByTestId('close-modal-button').length).toEqual(1);
  });
});
