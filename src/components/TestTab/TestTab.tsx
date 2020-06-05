import React, { useState } from 'react';
import {
  Formik,
  Field,
  Form,
  FieldAttributes,
  useField,
  // setFieldValue,
} from 'formik';
import * as yup from 'yup';
import { Button, TextField, Input } from '@material-ui/core';
import './TestTab.css';

interface Props {
  title?: string;
}

const schema = yup.object({
  firstName: yup.string().required(),
  firstName2: yup.string().required(),
  lastName: yup.string().required(),
});

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField placeholder={placeholder} {...field} helperText={errorText} />
  );
};

const TestTab: React.FC<Props> = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [fileSize, setFileSize] = useState([]);
  const [filePath, setFilePath] = useState([]);

  const handleClick = (event: any) => {
    document?.getElementById('hiddenFileInput')?.click();
  };

  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={{ firstName: '', lastName: '' }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit: ', data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <Field
                name="firstName"
                type="input"
                as={TextField}
                placeholder="First Name"
                variant="outlined"
              />
            </div>
            <div>
              <Field
                name="lastName"
                type="input"
                as={TextField}
                placeholder="Last Name"
                variant="outlined"
              />
            </div>
            <div>
              <Field
                name="fileUpload"
                type="input"
                as={TextField}
                placeholder="Click to upload a file!"
                variant="outlined"
                onClick={handleClick}
                disabled={true}
              />

              <Field
                name="file"
                id="hiddenFileInput"
                type="file"
                placeholder="Choose File"
                onChange={(event: any) => {
                  setFileName(event.currentTarget.files[0].name);
                  setFileSize(event.currentTarget.files[0].size);
                  setFilePath(event.currentTarget.files[0].webkitRelativePath);
                }}
                style={{ display: 'none' }}
              />
            </div>
            <div>
              <MyTextField
                name="firstName"
                placeholder="first names"
                type="input"
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue="Type something"
                variant="outlined"
              />
            </div>
            <div>
              <Button variant="outlined" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>Now Analyzing: {fileName}</pre>
            <pre>Size: {fileSize}</pre>
            <pre>Path: {filePath}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestTab;
