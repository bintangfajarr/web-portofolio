import { supabase, getServiceSupabase } from "./supabase";
import { getLocalData, saveLocalData } from "./localDb";

export async function dbGet(table: string, orderField: string = "sort_order") {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderField, { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      // fallback to local data on error
    }
  }
  return getLocalData(table as any);
}

export async function dbInsert(table: string, body: any) {
  const sb = getServiceSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from(table).insert(body).select().single();
      if (!error && data) return data;
      if (error) throw new Error(error.message);
    } catch (e: any) {
      if (e.message && !e.message.includes("Database not configured")) {
        throw e;
      }
    }
  }
  
  // Local DB insert
  const data = getLocalData(table as any);
  const newRow = { id: `${table}-${Date.now()}`, ...body };
  data.push(newRow);
  saveLocalData(table as any, data);
  return newRow;
}

export async function dbUpdate(table: string, id: string, body: any) {
  const sb = getServiceSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from(table).update(body).eq("id", id).select().single();
      if (!error && data) return data;
      if (error) throw new Error(error.message);
    } catch (e: any) {
      if (e.message && !e.message.includes("Database not configured")) {
        throw e;
      }
    }
  }
  
  // Local DB update
  const data = getLocalData(table as any);
  const index = data.findIndex((x: any) => String(x.id) === String(id));
  if (index !== -1) {
    data[index] = { ...data[index], ...body };
    saveLocalData(table as any, data);
    return data[index];
  }
  throw new Error("Item not found");
}

export async function dbDelete(table: string, id: string) {
  const sb = getServiceSupabase();
  if (sb) {
    try {
      const { error } = await sb.from(table).delete().eq("id", id);
      if (!error) return { success: true };
      if (error) throw new Error(error.message);
    } catch (e: any) {
      if (e.message && !e.message.includes("Database not configured")) {
        throw e;
      }
    }
  }
  
  // Local DB delete
  const data = getLocalData(table as any);
  const filtered = data.filter((x: any) => String(x.id) !== String(id));
  saveLocalData(table as any, filtered);
  return { success: true };
}

export async function dbGetAbout() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("about")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (!error && data) return data;
    } catch (e) {
      // fallback
    }
  }
  return getLocalData("about");
}

export async function dbSaveAbout(body: any) {
  const sb = getServiceSupabase();
  // We want to keep id as 1 in Supabase, but let's handle string/number
  const payload = { ...body, id: 1 };
  if (sb) {
    try {
      const { data, error } = await sb
        .from("about")
        .upsert(payload, { onConflict: "id" })
        .select()
        .single();
      if (!error && data) return data;
      if (error) throw new Error(error.message);
    } catch (e: any) {
      if (e.message && !e.message.includes("Database not configured")) {
        throw e;
      }
    }
  }
  saveLocalData("about", payload);
  return payload;
}
