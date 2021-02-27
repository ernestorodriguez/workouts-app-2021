import React, { ReactElement } from "react";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";

interface TopBarProps {
  startDateChangeHandler(value: string): void;
  categoryChangeHandler(value: string[]): void;
  startDateSelector?: Record<string, unknown>;
  availableCategories?: string[];
}

const TopBar = ({
  startDateChangeHandler,
  categoryChangeHandler,
  startDateSelector = {},
  availableCategories = [],
}: TopBarProps): ReactElement => {
  const startDateOption: DropdownItemProps[] = Object.keys(
    startDateSelector
  ).map((key) => {
    const dropdownItem: DropdownItemProps = {
      key,
      text: key,
      value: startDateSelector[key] as string | number | boolean | undefined,
    };
    return dropdownItem;
  });

  const availableCategoriesOption = availableCategories.map((key) => ({
    key,
    text: key,
    value: key,
  }));

  return (
    <header className="gallery-header" data-js="top-bar">
      <Dropdown
        className="gallery-header__dropdown start-date-selector"
        placeholder="Select Month"
        fluid
        selection
        options={startDateOption}
        onChange={(event, data) => {
          startDateChangeHandler(data.value as string);
        }}
      />
      <Dropdown
        className="gallery-header__dropdown category-selector"
        placeholder="Select Categories"
        fluid
        multiple
        selection
        options={availableCategoriesOption}
        data-js="start-date-filter"
        onChange={(event, data) => {
          categoryChangeHandler(data.value as string[]);
        }}
      />
    </header>
  );
};

export default TopBar;
