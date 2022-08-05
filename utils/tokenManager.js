import jwt from 'jsonwebtoken'

// Este token muere en poco tiempo PERO es el que se usa para hacer las operaciones importantes
// Muere rápido por seguridad
export const generateToken = (uid) => {
  const expiresIn = 360

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn }
  } catch (error) {
    console.log(error)
  }
}

// Este token vive más tiempo que el token Normal 
// Este token sirve para generar un nuevo token
// Este token únicamente sirve para que el usuario no vuelva a iniciar sesión
export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE = 'dev'),
      expire: new Date(Date.now() + expiresIn * 1000),
    })
  } catch (error) {
    console.log(error)
  }
}


export const jwtErrors = {
  'invalid signature': 'La firma del JWT no es válida',
  'jwt expired': 'JWT expirado',
  'invalid token': 'Token invalido',
  'No Bearer': 'Utiliza el formato de Bearer',

  // Mine
  'token missing' : 'Falta el token'
}