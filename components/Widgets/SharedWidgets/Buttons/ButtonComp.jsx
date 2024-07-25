import { Button } from '@mui/material'
import React from 'react'

const ButtonComp = ({ data, styles }) => {

    return (
        <>
            <Button
                disabled={data?.isDisabled ?? false}
                size="medium"
                sx={{
                    borderRadius: styles?.borderRadius??'6px',
                    // border: "1px solid red"
                    backgroundColor: styles?.bgColor ?? "#7D54C5",
                    color: styles?.color ?? "black",
                    margin: styles?.margin ?? '0',
                    opacity: data?.isDisabled ? '0.60' : '1',
                    padding: styles?.padding ?? "0.6em",
                    width: styles?.width ,
                    "&:hover": {
                        color: styles?.hoverClr ?? 'white',
                        backgroundColor: styles?.hoverBg ?? "#7D54C5",
                        padding: styles?.hvrPadding ?? "0.6em",
                        fontWeight: styles?.hvrFontWeight ?? "bold",

                    },

                }}
                onClick={data?.onClick}
            >
                {data?.title ?? 'Check'}
            </Button>
        </>
    )
}

export default ButtonComp