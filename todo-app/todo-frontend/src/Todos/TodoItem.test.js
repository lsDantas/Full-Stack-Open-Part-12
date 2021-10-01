import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import TodoItem from './TodoItem';

describe('To-Do Item', () => {
  test('Renders to-do text.', () => {
    const mockTodo = {
      'text': 'Hello world',
      'done': false,
    };

    const mockDeleteHandler = jest.fn();
    const mockCompleteHandler = jest.fn();

    const component = render(<TodoItem 
      todo={mockTodo} 
      onClickDelete={mockDeleteHandler}
      onClickComplete={mockCompleteHandler}
    />);

    expect(component.container).toHaveTextContent(mockTodo.text);
  });
  test('Complete button is clickable and triggers the completion handler.', () => {
    const mockTodo = {
      'text': 'Hello world',
      'done': false,
    };

    const mockDeleteHandler = jest.fn();
    const mockCompleteHandler = jest.fn();

    const component = render(<TodoItem
      todo={mockTodo}
      onClickDelete={(todo) => mockDeleteHandler}
      onClickComplete={(todo) => mockCompleteHandler}
    />);


    const completeButton = component.getByText('Set as done');
    fireEvent.click(completeButton);

    expect(mockCompleteHandler.mock.calls).toHaveLength(1);
  });
  test('Delete button is clickable and triggers the deletion handler.', () => { 
    const mockTodo = {
      'text': 'Hello world',
      'done': false,
    };

    const mockDeleteHandler = jest.fn();
    const mockCompleteHandler = jest.fn();

    const component = render(<TodoItem
      todo={mockTodo}
      onClickDelete={(todo) => mockDeleteHandler}
      onClickComplete={(todo) => mockCompleteHandler}
    />);

    const deleteButton = component.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteHandler.mock.calls).toHaveLength(1);
  });
})