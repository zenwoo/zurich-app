'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../shadcn-ui/button';
import { Label } from '../shadcn-ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../shadcn-ui/tooltip';

import hideEmail from '../../lib/hideEmail';

export default function EmailLabel({ text }) {
  const [hidden, setHidden] = useState(true);

  const handleButtonClick = () => {
    setHidden((previousValue) => (
      !previousValue
    ));
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Label>
          {hidden ? hideEmail(text) : text}
        </Label>
        {
          hidden ? (
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
