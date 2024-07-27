import ButtonComp from '@/components/Widgets/SharedWidgets/Buttons/ButtonComp'
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import DraggableModal from '@/components/Widgets/SharedWidgets/Models/DraggableModal';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle'
import { Button, IconButton, Modal } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';

const TitleAndBtnRow = ({ data, styles, useFormPropObj }) => {

    const { dynamicSectionsArr, setDynamicSectionsArr, availableSections } = data;
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        // console.log(dynamicSectionsArr);
        // console.log(useFormPropObj?.watch());
    };

    const handleBtnClick = () => {
        console.log('btn clicked')
    };

    return (
        <FlexContainer grid={12} styles={{
            margin: styles?.margin ?? '0 0 0 1em',
            justifyContent: styles?.justifyContent ?? 'space-between',

        }} >
            <span style={{ display: 'flex', alignItems: 'center' }}>
                {data?.backLink && (
                    <Link href={data?.backLink}>
                        <IconButton sx={{ marginRight: '5px', fontSize: '1.6em', color: '#C4C4C4', fontWeight: 'bolder' }}>
                            <BsArrowLeftShort />
                        </IconButton>
                    </Link>
                )}

                <DynamicTitle text={data?.text ?? 'Website Home Page Customization'} />
            </span>

            <div>
                {/* <Button variant="contained" onClick={handleOpenModal} sx={{marginRight: '1em'}}>
                    Edit
                </Button> */}
                {availableSections && <ButtonComp
                    data={{
                        title:  'Edit',
                        onClick: handleOpenModal
                    }}

                    styles={{
                        padding: styles?.padding ?? '0.5em 2em',
                        hvrPadding: styles?.hvrPadding ?? '0.6em 2em',
                        margin: '0 1em 0 0'
                        
                    }}
                />}
                
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <div style={{ backgroundColor: 'black', color: 'white' }}>
                        <DraggableModal
                            handleCloseModal={handleCloseModal}
                            currentState={dynamicSectionsArr || []}
                            setCurrentState={setDynamicSectionsArr}
                            useFormPropObj={useFormPropObj}
                            availableSections={availableSections}

                        />
                    </div>
                </Modal>

                <ButtonComp
                    data={{
                        title: data?.title ?? 'Save',
                        onClick: data?.onClick ?? handleBtnClick
                    }}

                    styles={{
                        padding: styles?.padding ?? '0.5em 2em',
                        hvrPadding: styles?.hvrPadding ?? '0.6em 2em',
                        color: '#fff'
                    }}
                />
            </div>
        </FlexContainer>
    )
};

export default TitleAndBtnRow;