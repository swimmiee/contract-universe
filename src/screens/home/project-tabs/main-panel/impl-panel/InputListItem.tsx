import { Box, TextField, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { AbiInput } from "web3-utils";

interface InputListItemProps {
    input: AbiInput | {name: string, type?: string}
    control: Control
}

export const InputListItem = ({input:{name, type}, control}:InputListItemProps) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center" p={.5}>
            {type && (
                <code>{type}</code>
            )}

            <Typography 
                display="flex"
                flex={1}
                mx={1}
                variant="caption"
                fontWeight="bold"
                children={name}
            />

            <Box display="flex" flex={4}>
                <Controller 
                    control={control}
                    name={name}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState,
                    }) => (
                      <TextField
                        size="small"
                        label={name}
                        fullWidth
                        type="text"
                        onBlur={onBlur} // notify when input is touched
                        onChange={onChange} // send value to hook form
                        inputRef={ref}
                      />
                    )}
                />
            </Box>
        </Box>
    )
}