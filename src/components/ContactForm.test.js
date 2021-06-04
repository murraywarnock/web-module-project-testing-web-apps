import React from 'react';
import {getByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    //Act: Find the header
    const header = screen.queryByText(/Contact Form/i);

    //Assert: verify that the header exists
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
 
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
//    const firstNameInput = screen.getByLabelText(/firstname/i);
    userEvent.type(firstNameInput, "abcd");
 
    const errMsg = screen.getAllByTestId("error");
    expect(errMsg).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
 
    const submitInput = screen.getByRole("button");
    userEvent.click(submitInput);
 
    const errMsg = screen.getAllByTestId("error");
    expect(errMsg).toHaveLength(3);
});


test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
 
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const submitInput = screen.getByRole("button");
 
    userEvent.type(firstNameInput, "Johnathan");
    userEvent.type(lastNameInput, "Edwards");
    userEvent.click(submitInput);

    const errMsg = screen.getAllByTestId("error");
    expect(errMsg).toHaveLength(1);   
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
 
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, "abcd");
 
    const errMsg = screen.getAllByText("email must be a valid email address.", { exact: false });
    expect(errMsg).toHaveLength(1);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
 
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const submitInput = screen.getByRole("button");
 
    userEvent.type(firstNameInput, "Johnathan");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "bob@bob.com");
    userEvent.click(submitInput);

    const errMsg = screen.getAllByText("lastName is a required field", { exact: false });
    expect(errMsg).toHaveLength(1);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    render(<DisplayComponent form={props.form}/>)
//    render(<DisplayComponent firstName="MURRAY" lastName="WARNOCK" email="murray@warnock.com" message='' />);
    const firstNameInput = screen.getByPlaceholderText(/edd/i);
    const lastNameInput = screen.getByPlaceholderText(/burke/i);
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    const submitInput = screen.getByRole("button");

    userEvent.type(firstNameInput, "Johnathan");
    userEvent.type(lastNameInput, "Edwards");
    userEvent.type(emailInput, "bob@bob.com");
    userEvent.click(submitInput);

 //   render(<DisplayComponent form={props.form}/>)

    const firstNameDisplay = screen.getByText(/first name:/i);
    const lastNameDisplay = screen.getByText(/last name:/i);
    const emailDisplay = screen.getByText(/email:/i);


});

test('renders all fields text when all fields are submitted.', async () => {
    
});

