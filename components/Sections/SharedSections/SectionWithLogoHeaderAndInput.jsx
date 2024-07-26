import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLogo from '../../../public/images/moufit-main-logo.png'
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer';
import InputFieldComp from '@/components/Widgets/SharedWidgets/InputFields/InputFieldComp';
import ButtonComp from '@/components/Widgets/SharedWidgets/Buttons/ButtonComp';
import Link from 'next/link';

const SectionWithLogoHeaderAndInput = ({ dataObj, useFormPropObj }) => {

  const router = useRouter();

  const styles = {
    container: {
      width: dataObj?.dynamicFields?.length > 1 ? '70%' : '50%',
      padding: '3em  0 0em 0',
    },
    img: {
      width: '100%',
      height: 'auto',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      padding: '2em 0 1em',
      textAlign: 'center',
    },
    input: {
      margin: '0 0.5em',
    },
    button: {
      padding: '0.5em 1em',
      margin: '0 0.5em',
      backgroundColor: '#0070f3',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    link: {
      padding: '0.5em 1em',
      margin: '0 0.5em',
      textDecoration: 'none',
      fontWeight: 'normal',
      color: '#fff',
      letterSpacing: '1px',
    },
  };

  const getLink = (text) => {
    switch(text?.toLowerCase()) {
      case "forgot password":
      case "forgot-password":
      case "forgotpassword":
        return '/authentication/forgot-password';
      case "login instead":
      case "login":
      case "signin":
        return '/authentication/signin';
      default:
        return '/authentication/signin';
    }
  }

  return (
    <div style={styles.container}>
      <FlexContainer grid={12} >
        <Image src={MainLogo} alt='ALT img' width='185px' height='63px' />
      </FlexContainer>

      <FlexContainer grid={12}
        styles={{ padding: '5em 0 0 0' }}
      >
        <DynamicTitle text={dataObj?.title ?? 'Forgot Password ?'} styles={{
          fontSize: '3em',
          fontWeight: '500'
        }} />
      </FlexContainer>

      <FlexContainer grid={12} styles={{ justifyContent: 'space-between', padding: '1em 0 1em 0' }}>
        {dataObj?.dynamicFields.map((field, index) => (

          <InputFieldComp
            key={index}
            dataObj={{
              target: field.target ?? `${useFormPropObj.formName}.emailField`,
              placeholder: field.placeholder ?? 'Email',
              label: field.label ?? 'Email',
              fieldType: field?.fieldType ?? 'text'
            }}
            styles={{
              width: dataObj?.dynamicFields?.length > 1 ? '49%' : '95%',
            }}
            useFormPropObj={useFormPropObj}
          />
        ))}

      </FlexContainer>

      <FlexContainer grid={12} styles={{ justifyContent: 'space-between' }}>
        <ButtonComp data={{
          title: dataObj?.buttonText ?? 'Send',
          onClick: () => dataObj?.onClick ? dataObj?.onClick() :   console.log(useFormPropObj.watch())
        }}
          styles={{
            padding: '0.6em 2.6em',
            hvrPadding: '0.6em 2.6em',
            color: '#fff'
          }}
        />

        {dataObj?.linkText && <Link  href={getLink(dataObj?.linkText)} style={styles.link}>{dataObj?.linkText}</Link>}
      </FlexContainer>
    </div>
  );
};

export default SectionWithLogoHeaderAndInput;
