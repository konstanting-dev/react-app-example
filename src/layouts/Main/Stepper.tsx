import React, { PropsWithChildren, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepper: {
      padding: '48px 24px',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    stepButton: {
      padding: 4,
      '& .MuiStepIcon-root': {
        width: 64,
        height: 64,
      },
      '& .MuiStepLabel-label': {
        fontSize: 20,
      },
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: 'inline-block',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    content: {
      padding: 80,
    },
  }),
);

const steps = [
  {
    value: 0,
    label: 'Team Invitation',
    path: '/invitation',
  },
  {
    value: 1,
    label: 'Import Vehicles',
    path: '/import',
  },
  {
    value: 2,
    label: 'Service Package',
    path: '/service',
  },
];

export default function OnboardingStepper({ children }: PropsWithChildren<unknown>) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [activeStep, setActiveStep] = React.useState(steps.find((step) => step.path === pathname)?.value || 0);
  const [completed, setCompleted] = React.useState(new Set<number>());

  useEffect(() => {
    const newRoute = steps.find((step) => step.value === activeStep)?.path;
    if (newRoute) {
      push(newRoute);
    } else {
      push('/congratulations');
    }
  }, [activeStep, pathname, push]);

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === steps.length;
  };

  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;
    if (completed.size !== steps.length) {
      handleComplete();
    }
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
  };

  function isStepComplete(step: number) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map(({ label }, index) => {
          const stepProps: { completed?: boolean } = {};
          const buttonProps: { optional?: React.ReactNode } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepButton
                className={classes.stepButton}
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.content}>
        {children}
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
