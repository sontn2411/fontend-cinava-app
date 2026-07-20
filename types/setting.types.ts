export interface SettingOption {
  key: string;
  value: string;
  isDefault?: boolean;
}

export interface MenuItem {
  id: number;
  key: string;
  value: string;
  slug: string;
  children?: {
    key: string;
    value: string;
    slug: string;
  }[];
}

export interface AppSetting {
  years: number[];
  sort_field: SettingOption[];
  sort_type: SettingOption[];
  slug_list_flim: SettingOption[];
  menus?: MenuItem[];
  categories?: MenuItem;
  nationals?: MenuItem;
}
