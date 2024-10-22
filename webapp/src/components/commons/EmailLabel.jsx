'use client';

import { useDispatch } from 'react-redux';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../shadcn-ui/button';
import { Label } from '../shadcn-ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../shadcn-ui/tooltip';

import { getUserEmail } from '../../store/user/userThunk';

export default function EmailLabel({ id, text, isEmailHidden }) {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(getUserEmail({ id, isEmailHidden: !isEmailHidden }));
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Label>
          {text}
        </Label>
        {
          !isEmailHidden === true ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleButtonClick}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleButtonClick}>
                    <EyeOff className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hide email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }
      </div>
    </div>
  );
}
