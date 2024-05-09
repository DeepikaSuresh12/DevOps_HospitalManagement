export{};
import { render,screen,waitFor } from '@testing-library/react';
import "@testing-library/jest-dom"
import Patient from './Components/Patient';
import Appointment from './Components/Appointment';
import Doctor from './Components/Doctor';
import Header from './Components/Header';
jest.mock("react-router-dom")

test(' patient insert', async() => {
  render(<Patient/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Insertbtn")
    expect(linkElement).toBeInTheDocument();
  });
});
  test('Findbutton', async() => {
    render(<Patient/>);
    await waitFor(()=>{
      const linkElement = screen.getByTestId("Findbtn")
      expect(linkElement).toBeInTheDocument();
    });
});
test('renders patient table', () => {
  render(<Patient />);
  expect(screen.getByText('Patient ID')).toBeInTheDocument();
  expect(screen.getByText('Patient Name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('PhoneNO')).toBeInTheDocument();
  expect(screen.getByText('Action')).toBeInTheDocument();
});
test(' Appointment insert button', async() => {
  render(<Appointment/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Insertbtn")
    expect(linkElement).toBeInTheDocument();
  });
});

test(' Appointment Find button', async() => {
  render(<Appointment/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Findbtn")
    expect(linkElement).toBeInTheDocument();
  });
});
test('renders appointment table', () => {
  render(<Appointment />);
  expect(screen.getByText('Appointment Id')).toBeInTheDocument();
  expect(screen.getByText('Appointment Date')).toBeInTheDocument();
  expect(screen.getByText('Patient Name')).toBeInTheDocument();
  expect(screen.getByText('Patient EMail')).toBeInTheDocument();
  expect(screen.getByText('Patient Phone Number')).toBeInTheDocument();
  expect(screen.getByText('Doctor Name')).toBeInTheDocument();
  expect(screen.getByText('Department of Appointment')).toBeInTheDocument();
  expect(screen.getByText('Action')).toBeInTheDocument();
});
test(' Insert Button', async() => {
  render(<Doctor/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Insertbtn")
    expect(linkElement).toBeInTheDocument();
  });
});
test('renders doctor table', () => {
  render(<Doctor />);
  expect(screen.getByText('Doctor ID')).toBeInTheDocument();
  expect(screen.getByText('Doctor name')).toBeInTheDocument();
  expect(screen.getByText('doctor Department')).toBeInTheDocument();
});
test(' Doctor find Button', async() => {
  render(<Doctor/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Findbtn")
    expect(linkElement).toBeInTheDocument();
  });
});
test(' Delete Button checking', async() => {
  render(<Doctor/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Deletebtn")
    expect(linkElement).toBeInTheDocument();
  });
});
test(' Delete Button checking', async() => {
  render(<Appointment/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Deletebtn")
    expect(linkElement).toBeInTheDocument();
  });
});
test(' Patient Records Button', async() => {
  render(<Patient/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Patient Records")
    expect(linkElement).toBeInTheDocument();
  });
});
test(' Delete Button checking', async() => {
  render(<Appointment/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Deletebtn")
    expect(linkElement).toBeInTheDocument();
  });
});
test(' Appointment Button checking', async() => {
  render(<Appointment/>);
  await waitFor(()=>{
    const linkElement = screen.getByTestId("Deletebtn")
    expect(linkElement).toBeInTheDocument();
  });
});






