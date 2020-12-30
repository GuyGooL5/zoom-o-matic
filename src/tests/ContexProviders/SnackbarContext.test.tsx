import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import SnackbarContext, { SnackbarContextProvider } from '../../ContextProviders/SnackbarContext'

describe('SnackbarContext test.', () => {
    const TestComponent = () => {
        const snackbar = useContext(SnackbarContext);
        return <>
            <SnackbarContextProvider>
                <button onClick={() => snackbar('snackbar1')}>btn1</button>
            </SnackbarContextProvider>
        </>
    }



    it('test to see if the message updates', () => {
        render(<TestComponent />);
        let btn1 = screen.getByText(/btn1/i);
        expect(btn1).toBeInTheDocument();
        btn1.click();
        setTimeout(() => {
            let snackbar = screen.getByText(/snackbar1/i);
            expect(snackbar).toBeVisible();
            setTimeout(() => expect(snackbar).not.toBeVisible(), 2000);
        }, 500)
    })
})