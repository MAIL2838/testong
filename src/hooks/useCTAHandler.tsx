import { useState } from 'react';

interface CTAHandlerState {
  isServiceSelectionOpen: boolean;
  isContactModalOpen: boolean;
  preSelectedService: string;
  hideServiceField: boolean;
}

export const useCTAHandler = () => {
  const [state, setState] = useState<CTAHandlerState>({
    isServiceSelectionOpen: false,
    isContactModalOpen: false,
    preSelectedService: '',
    hideServiceField: false,
  });

  const handleCTAClick = (serviceName?: string) => {
    if (serviceName) {
      // Service is already selected, go directly to contact form
      setState({
        isServiceSelectionOpen: false,
        isContactModalOpen: true,
        preSelectedService: serviceName,
        hideServiceField: true,
      });
    } else {
      // No service selected, show service selection modal
      setState({
        isServiceSelectionOpen: true,
        isContactModalOpen: false,
        preSelectedService: '',
        hideServiceField: false,
      });
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    setState({
      isServiceSelectionOpen: false,
      isContactModalOpen: true,
      preSelectedService: serviceName,
      hideServiceField: true,
    });
  };

  const closeServiceSelection = () => {
    setState(prev => ({
      ...prev,
      isServiceSelectionOpen: false,
    }));
  };

  const closeContactModal = () => {
    setState({
      isServiceSelectionOpen: false,
      isContactModalOpen: false,
      preSelectedService: '',
      hideServiceField: false,
    });
  };

  return {
    ...state,
    handleCTAClick,
    handleServiceSelect,
    closeServiceSelection,
    closeContactModal,
  };
};