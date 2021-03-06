const identityCheck = (user: any, object: any, key = 'user') => {
  if (!object || String(object.get(key)) !== String(user.id))
    return {
      status: 401,
      result: 'ERROR',
    };
  return null;
};

export default identityCheck;
