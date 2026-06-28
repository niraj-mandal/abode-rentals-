from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if the pixel is near white
        # The higher the threshold, the more "white" it removes. 
        # 230 is a good balance to remove background but keep orange.
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            # For anti-aliasing, ideally we'd scale alpha, but a hard threshold is fine for now
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg(
    r"C:\Users\niraj\.gemini\antigravity-ide\brain\f636304d-aa3f-4fcd-b0b7-1163380fac56\media__1782681571476.jpg",
    r"c:\Users\niraj\abode rentals final version layout\public\logo-mark.png"
)
