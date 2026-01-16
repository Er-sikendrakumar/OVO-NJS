/**
 * API service for fetching location states/provinces
 */

import { readFile } from 'fs/promises';
import path from 'path';

export interface State {
  state_id: string;
  state_abbr: string;
  state_name: string;
  timezone: string;
}

export interface Country {
  country_id: string;
  country_abbr: string;
  country_name: string;
  states: State[];
}

export interface StatesResponse {
  success: boolean;
  count: number;
  data: Country[];
}

/**
 * Fetch all states and provinces grouped by country
 */
export async function fetchStates(): Promise<StatesResponse> {
  const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', 'all-states.json');
  const fileContent = await readFile(jsonFilePath, 'utf-8');
  return JSON.parse(fileContent);
}
