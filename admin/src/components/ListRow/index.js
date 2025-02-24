import React, { memo } from 'react';
import get from 'lodash/get';
import { useIntl } from 'react-intl';
import { Flex } from '@strapi/design-system/Flex';
import { BaseCheckbox } from '@strapi/design-system';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { stopPropagation, onRowClick, pxToRem } from '@strapi/helper-plugin';
import Curve from '../../icons/Curve';
import BoxWrapper from './BoxWrapper';
import AttributeIcon from '../AttributeIcon';
import DisplayedType from './DisplayedType';

function ListRow({
  customField,
  firstLoopComponentUid,
  isFromDynamicZone,
  name,
  relation,
  repeatable,
  secondLoopComponentUid,
  target,
  targetUid,
  type,
  isMain,
  value,
  setValue,
  displayName,
  autoReload
}) {
  const isMorph = type === 'relation' && relation.includes('morph');
  const ico = ['integer', 'biginteger', 'float', 'decimal'].includes(type) ? 'number' : type;


  const src = target ? 'relation' : ico;

  let loopNumber;
  if (secondLoopComponentUid && firstLoopComponentUid) {
    loopNumber = 2;
  } else if (firstLoopComponentUid) {
    loopNumber = 1;
  } else {
    loopNumber = 0;
  }

  return (
    <BoxWrapper as="tr">
      <td style={{ position: 'relative' }}>
        {isMain !== true && <Curve color={isFromDynamicZone ? 'primary200' : 'neutral150'} />}
        <Stack paddingLeft={2} spacing={4} horizontal>
          <AttributeIcon type={src} customField={customField} />
          <Typography fontWeight="bold">{name}</Typography>
        </Stack>
      </td>
      <td>
      {target ? (
          <Typography>
            Relation with
            &nbsp;
            <span style={{ fontStyle: 'italic' }}>
              {target}
            </span>
          </Typography>
        ) : (
          <DisplayedType type={type} customField={customField} repeatable={repeatable} />
        )}
      </td>
      <td>
        <Flex justifyContent="flex-end" {...stopPropagation}>
          <BaseCheckbox disabled={!autoReload} aria-label="Select" onValueChange={val => setValue(val)} value={value}/>
        </Flex>

      </td>
    </BoxWrapper>
  );
}
export default memo(ListRow);
export { ListRow };
