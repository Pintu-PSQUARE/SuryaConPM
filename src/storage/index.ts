import { MMKV } from "react-native-mmkv";

/**
 * Centralized MMKV Storage Manager
 */
export class StorageManager {
  private static instances: Record<string, MMKV> = {};

  /**
   * Get or create an MMKV instance
   * Supports encryption with a custom key.
   */
  static getInstance(name: string, encryptionKey?: string): MMKV {
    if (!this.instances[name]) {
      this.instances[name] = new MMKV({
        id: name,
        encryptionKey: encryptionKey || `default-key-${name}`,
      });
    }
    return this.instances[name];
  }

  /**
   * Save an item in storage.
   * Converts objects to JSON before saving.
   */
  static setItem<T>(name: string, key: string, value: T): void {
    const storage = this.getInstance(name);
    try {
      const storedValue = typeof value === "object" ? JSON.stringify(value) : String(value);
      storage.set(key, storedValue);
      console.log(`✅ [MMKV:${name}] Saved -> Key: "${key}"`, value);
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error saving key "${key}":`, error);
    }
  }

  /**
   * Retrieve an item from storage.
   * Automatically parses JSON if applicable.
   */
  static getItem<T>(name: string, key: string): T | null {
    const storage = this.getInstance(name);
    try {
      const stringValue = storage.getString(key);
      if (!stringValue) return null;
      return stringValue.startsWith("{") || stringValue.startsWith("[") ? JSON.parse(stringValue) : (stringValue as unknown as T);
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error retrieving key "${key}":`, error);
      return null;
    }
  }

  /**
   * Remove a specific item from storage.
   */
  static removeItem(name: string, key: string): void {
    const storage = this.getInstance(name);
    try {
      storage.delete(key);
      console.log(`🗑️ [MMKV:${name}] Removed Key: "${key}"`);
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error removing key "${key}":`, error);
    }
  }

  /**
   * Completely clear all stored data.
   */
  static clearStorage(name: string): void {
    const storage = this.getInstance(name);
    try {
      storage.clearAll();
      console.log(`🧹 [MMKV:${name}] Cleared all data`);
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error clearing storage:`, error);
    }
  }

  /**
   * Get all stored keys in MMKV instance.
   */
  static getAllKeys(name: string): string[] {
    const storage = this.getInstance(name);
    try {
      return storage.getAllKeys();
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error getting all keys:`, error);
      return [];
    }
  }

  static updateCategoryItem(
    name: string,
    key: string,
    category: string,
    newData: { _id: string; [key: string]: any }[]
  ): void {
    try {
      const existingData = this.getItem<Record<string, any[]>>(name, key) || {};
  
      // Ensure the category exists before updating
      if (!existingData[category]) {
        console.warn(`⚠ Category "${category}" not found in MMKV. Skipping update.`);
        return; // Skip if the category is not present
      }
  
      // Convert stored category data into a Map to prevent duplicate `_id`
      const dataMap = new Map(existingData[category].map((item) => [item._id, item]));
  
      // Add or update items from newData only if the `_id` exists in the current data
      newData.forEach((item) => {
        if (dataMap.has(item._id)) {
          dataMap.set(item._id, item); // Update existing entry
        }
      });
  
      // Convert back to array and save
      existingData[category] = Array.from(dataMap.values());
  
      this.setItem(name, key, existingData);
      console.log(`✅ [MMKV:${name}] Updated Category "${category}" -> Key: "${key}"`);
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error updating category "${category}":`, error);
    }
  }

  static async saveSyncData(name: string, key: string, data: any, time: string): Promise<void> {
    try {
    
      const existingSyncData = this.getItem<{ docs: any[]; time: string }>(name, key) || { docs: [], time: "" };
      const transformObjToArr = Array.isArray(data) ? data : [data];

     
      const dataMap = new Map(existingSyncData.docs.map((item) => [item._id, item]));

      transformObjToArr.forEach((item) => {
        dataMap.set(item._id, item);
      });

      // Convert back to array and save
      const saveObject = { docs: Array.from(dataMap.values()), time };
      this.setItem(name, key, saveObject);

      console.log(`✅ [MMKV:${name}] Sync Data Saved -> Key: "${key}"`);
    } catch (error) {
      console.error(`❌ [MMKV:${name}] Error syncing data:`, error);
    }
  }
}