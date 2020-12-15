import React, { useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import SnackbarContext, { SnackbarContextProvider } from '../../ContextProviders/SnackbarContext'

describe('setMsg', () => {
    it('test to see if the message updates', () => {
        const TestComponent = () => {
            const { setMsg } = useContext(SnackbarContext);
            return <>
                <SnackbarContextProvider>
                    <button onClick={() => setMsg('snackbar1')}>btn1</button>
                </SnackbarContextProvider>
            </>
        }
        render(<TestComponent />);
        let btn1 = screen.getByText(/btn1/i);
        expect(btn1).toBeInTheDocument();
        btn1.click();
        let snackbar = screen.getByText(/snackbar1/i);
        expect(snackbar).toBeVisible();
        setTimeout(() => expect(snackbar).not.toBeVisible(), 2000);
    })
})