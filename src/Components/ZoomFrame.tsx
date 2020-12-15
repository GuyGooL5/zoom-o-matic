import React, { useEffect, useRef } from 'react'
import { LTIFormJSON } from '../interfaces'

interface IProps {
    lti: LTIFormJSON
}

export default function ZoomFrame({ lti }: IProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        formRef.current?.submit();
    }, [lti]);

    return <>
        <iframe src="about:blank" ref={iframeRef} name="zoomframe" style={{ height: '100%' }} title={lti.parameters.context_title} />
        <form style={{ display: 'none' }
        } ref={formRef} target="zoomframe" action={lti.endpoint} method="post" encType="application/x-www-form-urlencoded">
            {Object.entries(lti.parameters).map(([name, value]) => <input key={name} name={name} value={value} />)}
        </form>
    </>
}